import { API_URL } from "../constants";

export const getPendingPluginDetails = async (userData) => {
  const token = userData["userData"]["token"];

  try {
    const response = await fetch(API_URL + "/plugin/pending", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    return data["pendingPlugins"];
  } catch (error) {
    throw error;
  }
};

export const getDeveloperPluginDetails = async (userData) => {
  const userId = userData["userData"]["user_id"];
  const token = userData["userData"]["token"];

  try {
    const response = await fetch(API_URL + "/plugin/developer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        user_id: userId,
      },
    });

    const data = await response.json();
    console.log(data["plugins"]);
    return data["plugins"];
  } catch (error) {
    throw error;
  }
};

export const getPluginFullDetails = async (userData, pluginId) => {
  const token = userData["userData"]["token"];

  try {
    // Plugin data
    const pluginResponse = await fetch(API_URL + "/plugin/single", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        plugin_id: pluginId,
      },
    });
    const pluginData = await pluginResponse.json();
    const plugin = pluginData["plugin"];

    // EM file data
    const emFileResponse = await fetch(API_URL + "/em-data-record", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        em_raw_file_id: plugin["em_file_id"],
      },
    });
    const emFileData = await emFileResponse.json();
    const emFile = emFileData["em_raw_file"];

    // Plugin icon
    const pluginIconResponse = await fetch(API_URL + "/plugin/icon", {
      method: "GET",
      headers: {
        Authorization: token,
        icon_filename: plugin["icon_filename"],
      },
    });
    const pluginIcon = await pluginIconResponse.blob();
    plugin["icon_filepath"] = URL.createObjectURL(pluginIcon);

    const resultDat = { plugin, emFile };

    // console.log(resultDat);

    return resultDat;
  } catch (error) {
    throw error;
  }
};

export const getFilteredPluginDetails = async (
  userData,
  emRawFileId,
  fftSize
) => {
  const token = userData["userData"]["token"];

  try {
    const response = await fetch(API_URL + "/plugin/filter", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        em_raw_file_id: emRawFileId,
        fft_size: fftSize,
      },
    });

    const data = await response.json();
    const resultData = data["filteredPluginData"];

    for (const plugin of resultData) {
      // Fetch plugin icon
      const pluginIconResponse = await fetch(API_URL + "/plugin/icon", {
        method: "GET",
        headers: {
          Authorization: token,
          icon_filename: plugin["icon_filename"],
        },
      });

      // Get plugin icon as blob
      const pluginIcon = await pluginIconResponse.blob();

      // Store the location of the plugin icon in the relevant object
      plugin["icon_filepath"] = URL.createObjectURL(pluginIcon);
    }

    console.log(resultData);
    return resultData;
  } catch (error) {
    throw error;
  }
};
