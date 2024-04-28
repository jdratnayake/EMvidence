<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
