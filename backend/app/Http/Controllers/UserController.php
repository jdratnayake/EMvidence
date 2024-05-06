<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\AnalysisPlugin;

class UserController extends Controller
{
    // Display investigator and developer details
    public function index()
    {
        $users = User::whereIn('user_type', ['investigator', 'developer'])
            ->select('user_id', 'user_type', 'ban_status', 'first_name', 'last_name', 'email', 'phone_number', 'profile_picture')
            ->get();

        $responseData = [
            'users' => $users,
        ];

        return response()->json($responseData);
    }
    public function getAdminStat()
    {
        $investigatorDeveloperCount = User::whereIn('user_type', ['investigator', 'developer'])->count();
        $compatiblePluginCount = AnalysisPlugin::where('compatibility_status', 'compatible')->count();
        $incompatiblePluginCount = AnalysisPlugin::where('compatibility_status', 'incompatible')->count();

        // Fetch compatible plugins count for each month
        $compatiblePluginsCount = AnalysisPlugin::where('compatibility_status', 'compatible')
            ->orderBy('plugin_compatibility_verified_timestamp')
            ->get()
            ->groupBy(function ($date) {
                return \Carbon\Carbon::parse($date->plugin_compatibility_verified_timestamp)->format('F');
            })
            ->map(function ($item) {
                return $item->count();
            });

        // Initialize labels and data arrays
        $labelsPlugins = [];
        $dataPlugins = [];

        // Fill labels and data arrays with fetched data
        foreach ($compatiblePluginsCount as $month => $count) {
            $labelsPlugins[] = $month;
            $dataPlugins[] = $count;
        }

        // Convert arrays to JSON format
        $labelsJsonPlugins = json_encode($labelsPlugins);
        $dataJsonPlugins = json_encode($dataPlugins);

        // ------------------------------------

        // Fetch users count for each month
        $usersCount = User::whereIn('user_type', ['developer', 'investigator'])
            ->orderBy('account_creation_timestamp')
            ->get()
            ->groupBy(function ($date) {
                return \Carbon\Carbon::parse($date->account_creation_timestamp)->format('F');
            })
            ->map(function ($item) {
                return $item->count();
            });

        // Initialize labels and data arrays
        $labelsUsers = [];
        $dataUsers = [];

        // Fill labels and data arrays with fetched data
        foreach ($usersCount as $month => $count) {
            $labelsUsers[] = $month;
            $dataUsers[] = $count;
        }

        // Convert arrays to JSON format
        $labelsJsonUsers = json_encode($labelsPlugins);
        $dataJsonUsers = json_encode($dataPlugins);

        $responseData = [
            'userCount' => $investigatorDeveloperCount,
            "compatiblePluginCount" => $compatiblePluginCount,
            "incompatiblePluginCount" => $incompatiblePluginCount,
            "pluginGrowth" => ["label" => $labelsPlugins, "data" => $dataPlugins],
            "userGrowth" => ["label" => $labelsUsers, "data" => $dataUsers]
        ];

        return response()->json($responseData);
    }

    public function getUser(Request $request)
    {
        $userId = $request->header('user_id');
        info($userId);
        $user = User::where('user_id', $userId)
            ->select('user_id', 'user_type', 'ban_status', 'first_name', 'last_name', 'email', 'phone_number', 'profile_picture')
            ->get();

        $responseData = [
            'user' => $user,
        ];

        return response()->json($responseData);
    }

    public function getUserProfileImage(Request $request)
    {
        $userId = $request->header('user_id');
        info("--- getUserProfileImage ---");
        info($userId);
        $user = User::find($userId);
        $imagePath = env("PROFILE_IMAGE_PATH") . $user->profile_picture;
        //return response()->file($imagePath);
        info('this is image path: '.$imagePath);
        if (file_exists($imagePath)) {
            info('image exists');
            info($imagePath);
            return response()->file($imagePath);
        } else {
            info('image doesnt exists');
            $defaultImagePath = env("PROFILE_IMAGE_PATH") . "default.svg";
            info($defaultImagePath);
            return response()->file($defaultImagePath);
        }
    }


    public function updatePassword(Request $request)
    {
        $userId = $request->input('user_id');
        $currentPassword = $request->input('password');
        $newPassword = $request->input('new_password');

        try {
            $user = User::find($userId);
            $userPassword = $user->password;

            info('got password ' . ' ' . $userId . ' ' . $currentPassword . ' ' . $newPassword . ' ' . $userPassword);

            if (Hash::check($currentPassword, $userPassword)) {
                $setPassword = bcrypt($newPassword);
                $user->password = $setPassword;
                $user->save();

                return response()->json(['status' => 'match'], 200);
            } else {
                return response()->json(['status' => 'not_match'], 200);
            }
        } catch (\Throwable $th) {
            response()->json(['error' => 'Failed to update Password'], 500);
        }
    }

    public function changeBanStatus(Request $request)
    {
        $userId = $request->user_id;
        $newBanStatus = $request->ban_status;

        try {
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // Update the ban_status
            $user->ban_status = $newBanStatus;
            $user->save();

            return response()->json(['success' => 'Ban status updated successfully'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions
            return response()->json(['error' => 'Failed to update ban status'], 500);
        }
    }
    public function updateUserInfo(Request $request)
    {
        try {

            $userId = $request->input('user_id');
            $firstName = $request->input('first_name');
            $lastName = $request->input('last_name');
            $email = $request->input('email');
            $phoneNo = $request->input('phone_number');
            $image = $request->file('prof_img');
            $imageName = $request->input('img_name');

            info($userId . ' ' . $firstName . ' ' . $lastName . ' ' . $email . ' ' . $imageName);
            info($image);
            $user = User::find($userId);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $getImageName =  $user->profile_picture;
            
            if ($imageName == "default.svg"){
                info("user is using default image");
                // $imageName = 'default.svg';
            } else if($imageName != $getImageName){
                info("user changed the image");
                // delete previous image
                $imagePath = env("PROFILE_IMAGE_PATH") . $getImageName;
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
                // add new image
                $imageName = $userId . '_' . $imageName;
                info("image name is updated : " . $imageName);
                $imagePath = env("PROFILE_IMAGE_PATH");
                $image->move($imagePath, $imageName);
            }else{
                info("user didnt changed the image");
            }

            // if ($imageName != "default.svg" && $imageName == $getImageName) {
            //     // delete previous image
               
            //     $imagePath = env("PROFILE_IMAGE_PATH") . $getImageName;
            //     if (file_exists($imagePath)) {
            //         unlink($imagePath);
            //     }

            //     $imageName = $userId . '_' . $imageName;
            //     info("image name is updated : " . $imageName);
            //     $imagePath = env("PROFILE_IMAGE_PATH");
            //     $image->move($imagePath, $imageName);
            // } else if( $imageName == "default.svg") {
            //     info("user is using default image");
            //     $imageName = 'default.svg';
            // }else{
            //     info("user didnt changed the image");
            // }

            $user->first_name = $firstName;
            $user->last_name = $lastName;
            $user->email = $email;
            $user->phone_number = $phoneNo;
            $user->profile_picture = $imageName;
            $user->save();

            return response()->json(['success' => 'updated successfully'], 200);
        } catch (\Exception $e) {

            return response()->json(['error' => 'Failed to update User Details'], 500);
        }
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
