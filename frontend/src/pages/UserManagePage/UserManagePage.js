import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { useQuery, useQueryClient } from "react-query";
import {
  Button,
  Chip,
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
import { queryKeys } from "../../constants";
import { getInvestigatorDeveloperDetails } from "../../services/userService";
import { useUser } from "../../contexts/UserContext";
import { getFullName, capitalizeWords } from "../../helper";

function UserManagePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [deactivateUserId, setDeactivateUserId] = useState(null);
  const [activateUserId, setActivateUserId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();
  const { user } = useUser();

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const handleClose = () => setIsModalOpen(false);
  const handleActivateClose = () => setIsActivateModalOpen(false);

  const handleClicked = (userId) => {
    setDeactivateUserId(userId);
    setIsModalOpen(true);
    console.log(userId);
  };

  const handleActivateClicked = (userId) => {
    setActivateUserId(userId);
    setIsActivateModalOpen(true);
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
        open={isModalOpen}
        userId={deactivateUserId}
        onClose={handleClose}
      />
      <ActivateModal
        open={isActivateModalOpen}
        userId={activateUserId}
        onClose={handleActivateClose}
      />
      <ContainerBox>
        <HeadingBox>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </HeadingBox>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <TextField
            id="search"
            label={searchText === "" ? "Search" : ""}
            sx={{ ...sxStyle }}
            InputLabelProps={{
              shrink: false,
            }}
            value={searchText}
            onChange={handleSearch}
            variant="outlined"
            style={{
              width: "500px",
              marginTop: "40px",
              backgroundColor: "white",
              borderRadius: 4,
            }}
            InputProps={{
              endAdornment: <SearchIcon sx={{ fontSize: 30 }} />,
            }}
          />
        </Grid>
        <ContentBox>
          <TableBox>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: "440" }}>
                <Table stickyHeader aria-label="sticky table">
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
                            <Button
                              variant="outlined"
                              sx={{
                                color: "#00245A",
                                cursor: "pointer",
                                borderColor: "rgba(0, 36, 90, 0.4)",
                                "&:hover": {
                                  borderColor: "#00245A",
                                },
                              }}
                              onClick={() => {}}
                            >
                              <ModeEditIcon sx={{ ml: -1, mr: 1 }} />
                              Edit
                            </Button>
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
                              onClick={() => {}}
                            >
                              <VisibilityIcon sx={{ ml: -1, mr: 1 }} />
                              View
                            </Button>
                            <span style={{ marginLeft: "10px" }}>
                              {"\u00A0"}
                            </span>

                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                handleClicked(3);
                              }}
                            >
                              {/* <DeleteIcon sx={{ ml: -1, mr: 1 }} /> */}
                              Deactivate
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TableBox>
        </ContentBox>
      </ContainerBox>
    </>
  );
}

export default UserManagePage;
