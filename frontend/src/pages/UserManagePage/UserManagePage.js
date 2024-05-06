import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { useQuery, useQueryClient } from "react-query";
import { Container } from "@mui/system";
import {
  Button,
  Chip,
  useMediaQuery,
  useTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeactivateModal from "../../components/DeactivateModal/DeactivateModal";
import ActivateModal from "../../components/ActivateModal/ActivateModal";
import {
  sxStyle,
  ContainerBox,
  HeadingBox,
  ContentBox,
  TableBox,
} from "./StyleComponents";
import { API_URL, queryKeys } from "../../constants";
import { getInvestigatorDeveloperDetails } from "../../services/userService";
import { useUser } from "../../contexts/UserContext";
import { getFullName, capitalizeWords } from "../../helper";
import { useNavigate } from "react-router-dom";

function UserManagePage() {
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedUserId, setSelectedUserId] = useState(0);
  // false => activate
  // true => deactivate
  const [banStatus, setBanStatus] = useState(null);
  const [activateModalStatus, setActivateModalStatus] = useState(false);
  const [deactivateModalStatus, setDeactivateModalStatus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchText(searchTerm);

    // console.log(searchTerm);
    if (!searchTerm) {
      queryClient.prefetchQuery(
        [queryKeys["getInvestigatorDeveloperDetails"]],
        () => getInvestigatorDeveloperDetails(user)
      );
    } else {
      const searchTermLower = searchTerm.toLowerCase();

      const newData = data.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`;
        return fullName.toLowerCase().includes(searchTermLower);
      });

      queryClient.setQueryData(
        queryKeys["getInvestigatorDeveloperDetails"],
        newData
      );
    }
  };

  const handleBanStatusChange = async () => {
    const userData = { user_id: selectedUserId, ban_status: banStatus };

    const response = await fetch(API_URL + "/user/ban-status-change", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user["userData"]["token"],
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (responseData.hasOwnProperty("success")) {
      const newData = data.map((user) => {
        // Check if the user_id matches the specified userId
        if (user.user_id === selectedUserId) {
          // If match found, return a new user object with updated ban_status
          return { ...user, ban_status: banStatus };
        } else {
          // If no match found, return the original user object
          return user;
        }
      });

      queryClient.setQueryData(
        queryKeys["getInvestigatorDeveloperDetails"],
        newData
      );

      setActivateModalStatus(false);
      setDeactivateModalStatus(false);
    } else {
      console.log("Error");
    }
  };

  // false => active account
  // true => inactive account
  const settingsArray = {
    false: {
      labelName: "Active",
      style: {
        background: "#ECFDF3",
        color: "#037847",
        mt: "10px",
      },
    },
    true: {
      labelName: "Inactive",
      style: {
        background: "#FFF2F2",
        color: "red",
        mt: "10px",
      },
    },
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys["getInvestigatorDeveloperDetails"]],
    queryFn: () => getInvestigatorDeveloperDetails(user),
    enabled: false,
  });

  useEffect(() => {
    // Enable the query when the user object becomes available
    if (user) {
      queryClient.prefetchQuery(
        [queryKeys["getInvestigatorDeveloperDetails"]],
        () => getInvestigatorDeveloperDetails(user)
      );
    }
  }, [user]);

  return (
    <>
      <DeactivateModal
        open={deactivateModalStatus}
        name="Test name"
        onClose={() => setDeactivateModalStatus(false)}
        handleBanStatusChange={handleBanStatusChange}
      />
      <ActivateModal
        open={activateModalStatus}
        name="Test name"
        onClose={() => setActivateModalStatus(false)}
        handleBanStatusChange={handleBanStatusChange}
      />
      <Container>
        <Typography
          variant="h4"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          Users
        </Typography>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <TextField
            id="search"
            label={searchText === "" ? "Search User" : ""}
            sx={{ ...sxStyle }}
            InputLabelProps={{
              shrink: false,
            }}
            value={searchText}
            onChange={handleSearch}
            variant="outlined"
            style={{
              width: lessThanMd? "80%" : "50%",
              marginTop: "40px",
              backgroundColor: "white",
              borderRadius: 4,
            }}
            InputProps={{
              endAdornment: <SearchIcon sx={{ fontSize: 30 }} />,
            }}
          />
        </Grid>
        <TableContainer sx={{ maxHeight: "440" }} component={Paper}>
          <Table stickyHeader aria-label="custom pagination table" sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" color="textPrimary">
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="textPrimary">
                    Type
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="textPrimary">
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="textPrimary">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((user) => (
                <TableRow hover={true} key={user.user_id}>
                  <TableCell>
                    {getFullName(user.first_name, user.last_name)}
                  </TableCell>
                  <TableCell>{capitalizeWords(user.user_type)}</TableCell>
                  <TableCell align="center">
                    <Chip
                      sx={settingsArray[user.ban_status]["style"]}
                      label={settingsArray[user.ban_status]["labelName"]}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: "10px" }}>
                        {"\u00A0"}
                      </span>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "#00245A",
                          cursor: "pointer",
                          borderColor: "rgba(0, 36, 90, 0.4)",
                          "&:hover": {
                            borderColor: "#00245A", // Change to the desired hover color
                          },
                        }}
                        onClick={() => {
                          navigate(`/user/${user.user_id}`)
                        }}
                      >
                        <VisibilityIcon sx={{ ml: -1, mr: 1 }} />
                        View
                      </Button>
                      <span style={{ marginLeft: "10px" }}>
                        {"\u00A0"}
                      </span>

                      {user.ban_status === "false" ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            setSelectedUserId(user.user_id);
                            setDeactivateModalStatus(true);
                            setBanStatus("true");
                          }}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          sx={{
                            color: "green",

                            cursor: "pointer",

                            borderColor: "rgba(0, 128, 0, 0.4)",

                            pl: 3,

                            pr: 3,

                            "&:hover": {
                              borderColor: "green",
                            },
                          }}
                          onClick={() => {
                            setSelectedUserId(user.user_id);
                            setActivateModalStatus(true);
                            setBanStatus("false");
                          }}
                        >
                          {/* <DeleteIcon sx={{ ml: -1, mr: 1 }} /> */}
                          Activate
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default UserManagePage;
