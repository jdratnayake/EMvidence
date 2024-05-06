import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  Typography,
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Container } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../PluginsPage/p4.png";
import Tooltip from "@mui/material/Tooltip";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { queryKeys } from "../../constants";
import { getCompatiblePluginDetails } from "../../services/pluginService";
import { useUser } from "../../contexts/UserContext";
import { getFullName } from "../../helper";
import "./PluginsPage.css";

function PluginsPage() {
  const containerStyle = {
    // backgroundColor: "white",
    padding: "0px",
    borderRadius: "8px",
    marginTop: "0px",
  };
  const [searchText, setSearchText] = useState("");

  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("");
  const [pluginName, setPluginName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const queryClient = useQueryClient();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchText(event.target.value);

    if (!searchTerm) {
      queryClient.prefetchQuery([queryKeys["getCompatiblePluginDetails"]], () =>
        getCompatiblePluginDetails(user)
      );
    } else {
      const searchTermLower = searchTerm.toLowerCase();

      const newData = data.filter((plugin) => {
        return plugin.plugin_name.toLowerCase().includes(searchTermLower);
      });

      queryClient.setQueryData(
        queryKeys["getCompatiblePluginDetails"],
        newData
      );
    }
  };

  const handleClickOpen = (plugin) => {
    setIcon(plugin.icon_filepath);
    setPluginName(plugin.plugin_name);
    setAuthor(getFullName(plugin.first_name, plugin.last_name));
    setDescription(plugin.plugin_description);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sxStyle = {
    "&:hover": {
      "&& fieldset": {
        border: "2px solid #00245A",
      },
    },
    "& .MuiInputLabel-outlined": {
      color: "grey", // Initial color
      "&.Mui-focused": {
        color: "#00245A", // Color when focused
      },
    },
    color: "#00245A",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#00245A",
          borderWidth: "2px",
        },
      },
      "& .MuiInputLabel-outlined": {
        color: "#2e2e2e",
        fontWeight: "bold",
        "&.Mui-focused": {
          color: "secondary.main",
          fontWeight: "bold",
        },
      },
    },
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys["getCompatiblePluginDetails"]],
    queryFn: () => getCompatiblePluginDetails(user),
    enabled: false,
  });

  useEffect(() => {
    if (user) {
      queryClient.prefetchQuery([queryKeys["getCompatiblePluginDetails"]], () =>
        getCompatiblePluginDetails(user)
      );
    }
  }, [user]);

  return (
    <>
      <div className="popup">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogContent>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Grid container alignItems="center" justifyContent="center">
                    <img
                      src={icon}
                      alt="Logo"
                      style={{
                        width: "70px",
                        height: "70px",
                        alignContent: "center",
                        borderRadius: "50%",
                        border: "2px solid grey"
                      }}
                    />
                  </Grid>

                  <Typography
                    sx={{ fontSize: 16, fontWeight: "bold" }}
                    color="text.primary"
                    gutterBottom
                    align="center"
                    marginTop={2}
                  >
                    {pluginName}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    marginTop={2}
                    align="center"
                  >
                    Maintained by {author}
                  </Typography>
                  <Typography color="text.secondary" marginTop={2} align="center">
                    {description}
                  </Typography>
                </CardContent>
              </React.Fragment>{" "}
            </Card>
          </DialogContent>
        </Dialog>
      </div>

      <Container style={containerStyle}>
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          marginTop={0}
        >
          EM-SCA Plugins
        </Typography>

        <Grid container alignItems="center" justifyContent="center">
          <TextField
            id="search"
            label={searchText === "" ? "Search Plugins" : ""}
            InputLabelProps={{
              shrink: false,
            }}
            value={searchText}
            onChange={handleSearch}
            variant="outlined"
            sx={{ ...sxStyle }}
            style={{
              width: "600px",
              marginTop: "40px",
              backgroundColor: "white",
              borderRadius: "4px"
            }}
            InputProps={{
              endAdornment: <SearchIcon sx={{ fontSize: 30 }} />,
            }}
          />
        </Grid>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: "white", pt: 5, pb: 5, borderRadius: "10px" }}
          marginTop={4}
        >
          {data?.map((plugin) => (
            <Grid
              key={plugin.plugin_id}
              xs={5}
              sm={5}
              md={3}
              marginTop={8}
              m={2}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  minWidth: 200,
                  maxWidth: 200,
                  boxShadow: 4,
                  borderRadius: "6px",
                  "&:hover": {
                    boxShadow: "0px 0px 10px rgba(0,36,90, 1)",
                  },
                }}
              >
                <Card
                  variant="outlined"
                  onClick={() => {
                    handleClickOpen(plugin);
                  }}
                >
                  <React.Fragment>
                    <CardContent>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                      >
                        <img
                          src={plugin.icon_filepath}
                          alt="Logo"
                          style={{
                            width: "70px",
                            height: "70px",
                            alignContent: "center",
                            borderRadius: "50%",
                            border: "2px solid grey",
                          }}
                        />
                      </Grid>

                      <Typography
                        sx={{ fontSize: 16, fontWeight: "bold" }}
                        color="text.primary"
                        gutterBottom
                        align="center"
                        marginTop={2}
                      >
                        {plugin.plugin_name}
                      </Typography>
                      <Tooltip title={"No of Usage"}>
                        <Typography
                          color="text.secondary"
                          marginTop={2}
                          align="center"
                          sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                        >
                          <SaveAltIcon sx={{}} /> {plugin.number_of_usage_times}
                        </Typography>
                      </Tooltip>
                    </CardContent>
                  </React.Fragment>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default PluginsPage;
