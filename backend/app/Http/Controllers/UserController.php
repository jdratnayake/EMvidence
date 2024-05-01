<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
        info("user profile image");
        info($userId);
        $user = User::find($userId);
        $imagePath = env("PROFILE_IMAGE_PATH") . $user->profile_picture;
        return response()->file($imagePath);
        // info('this is image path: '.$imagePath);
        // if (file_exists($imagePath)) {
        //     info('image exists');
        //     info($imagePath);
        //     return response()->file($imagePath);
        // } else {
        //     $defaultImagePath = env("PROFILE_IMAGE_PATH") . "default_image.jpg";
        //     info($defaultImagePath);
        //     return response()->file($defaultImagePath);
        // }
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
            if ($imageName != "null") {
                // delete previous image
                $getImage = User::where('user_id', $userId)
                    ->select('profile_picture')
                    ->get();
                $imagePath = env("PROFILE_IMAGE_PATH") . $getImage[0]->profile_picture;
                if ($getImage[0]->profile_picture != "default_image.jpg" && file_exists($imagePath)) {
                    unlink($imagePath);
                }

                $imageName = $userId . '_' . $imageName;
                info("this is image name: " . $imageName);
                $imagePath = env("PROFILE_IMAGE_PATH");
                $image->move($imagePath, $imageName);
            } else {
                info("user is using default image");
                $imageName = 'default_image.jpg';

            }
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
