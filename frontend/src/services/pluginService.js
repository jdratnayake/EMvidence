import { API_URL } from "../constants";

export const getInitialPluginDetails = async (userData) => {
  const token = userData["userData"]["token"];

  try {
    const response = await fetch(API_URL + "/plugin/initial", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    return data["initialPlugins"];
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
    console.log(data["filteredPluginData"]);
    return data["filteredPluginData"];
  } catch (error) {
    throw error;
  }
};
