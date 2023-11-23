import React from "react";
import NavBar from "../components/NavBar";
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  NativeSelect,
  Typography,
} from "@mui/material";
import folder from "./../Resources/folder.png";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const AnalysisPage = () => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        <Box class="file_selection">
          <Box sx={{ bgcolor: "#000000", height: "10vh", margin: "0",display: "flex", }}>
            <Typography
              variant="h4"
              sx={{
                pt: "10px",
                pl: "5px",
                fontFamily: "Inter",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "#FFFFFF",
                mb: 0,
                mr: "20px",
              }}
              gutterBottom
            >
              File Selection
            </Typography>
            <IconButton
              sx={{ mt: "-10px" }}
              aria-label="add-plugin"
              color="success"
            >
              <ControlPointIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              bgcolor: "#DED4D4",
              margin: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Horizontal layout
                border: "2px solid #000000",
                width: "60%",
                marginTop: "10px",
              }}
            >
              {/* Left Section */}
              <Box
                sx={{
                  flex: "0 0 auto", // Do not grow or shrink, use auto for width
                  padding: "10px",
                  boxSizing: "border-box", // Include padding in width calculation
                }}
              >
                <Box
                  sx={{
                    width: "133px",
                    height: "20vh",
                    flexShrink: 0,
                    background: `url(${folder}), #DED4D4 100% / cover no-repeat`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></Box>
              </Box>

              {/* Divider Line */}
              <Box
                sx={{
                  position: "relative",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  backgroundColor: "#000000",
                  content: "''",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />

              {/* Right Section */}
              <Box
                sx={{
                  flex: 1,
                  padding: "16px",
                }}
              >
                <Typography variant="body1" gutterBottom>
                  <strong>Size:</strong> 1.3 GB 
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Sampling Rate:</strong> 20MHz 
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Center Frequency:</strong> 16MHz 
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Sampling Duration:</strong> 20s 
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Hash Function:</strong> SHA256 
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>IoT Device:</strong> Amazon Alexa 
                </Typography>
              </Box>
            </Box>
            <Button
              sx={{ mb: "10px", ml: "80%", mr: "3%" }}
              variant="contained"
              color="success"
            >
              Select
            </Button>
          </Box>
        </Box>
        <Box class="pre_processing" sx={{ mt: "40px" }}>
          <Box sx={{ bgcolor: "#000000", height: "10vh", margin: "0" }}>
            <Typography
              variant="h4"
              sx={{
                pt: "10px",
                pl: "5px",
                fontFamily: "Inter",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "#FFFFFF",
                mb: 0,
              }}
              gutterBottom
            >
              Pre-Processing Plugins
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "#DED4D4",
              margin: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: "20px",
                  mb: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  display="block"
                  sx={{ ml: "20px", mr: "20px" }}
                  gutterBottom
                >
                  Domain Conversion:
                </Typography>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "domain-conversion",
                    id: "uncontrollerd-native",
                  }}
                  sx={{ mt: "-10px" }}
                >
                  <option value={1}>
                    STFT (FFT_SIZE = 2048 & Overlap Size = 256)
                  </option>
                  <option value={2}>Option 2</option>
                  <option value={3}>Option 3</option>
                </NativeSelect>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: "20px",
                  mb: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  display="block"
                  sx={{ ml: "20px", mr: "20px" }}
                  gutterBottom
                >
                  Down Sampling:
                </Typography>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "domain-conversion",
                    id: "uncontrollerd-native",
                  }}
                  sx={{ mt: "-10px" }}
                >
                  <option value={1}>To 10MHz</option>
                  <option value={2}>Option 2</option>
                  <option value={3}>Option 3</option>
                </NativeSelect>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: "20px",
                  mb: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  display="block"
                  sx={{ ml: "20px", mr: "20px" }}
                  gutterBottom
                >
                  Frequency Channel Selection:
                </Typography>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "domain-conversion",
                    id: "uncontrollerd-native",
                  }}
                  sx={{ mt: "-10px" }}
                >
                  <option value={1}>All Channels</option>
                  <option value={2}>Option 2</option>
                  <option value={3}>Option 3</option>
                </NativeSelect>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: "20px",
                  mb: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  display="block"
                  sx={{ ml: "20px", mr: "20px" }}
                  gutterBottom
                >
                  Sample Selection:
                </Typography>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "domain-conversion",
                    id: "uncontrollerd-native",
                  }}
                  sx={{ mt: "-10px" }}
                >
                  <option value={1}>First 20000 Samples</option>
                  <option value={2}>Option 2</option>
                  <option value={3}>Option 3</option>
                </NativeSelect>
              </Box>
              <Button
                sx={{ mb: "10px", ml: "80%", mr: "3%" }}
                variant="contained"
                color="success"
              >
                Select
              </Button>
            </FormControl>
          </Box>
        </Box>

        <Box class="analysis" sx={{ mt: "40px" }}>
          <Box
            sx={{
              bgcolor: "#000000",
              height: "10vh",
              margin: "0",
              display: "flex",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                pt: "10px",
                pl: "5px",
                fontFamily: "Inter",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "#FFFFFF",
                mb: 0,
                mr: "20px",
              }}
              gutterBottom
            >
              Analysis Plugins
            </Typography>
            <IconButton
              sx={{ mt: "-10px" }}
              aria-label="add-plugin"
              color="success"
            >
              <ControlPointIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              bgcolor: "#DED4D4",
              margin: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                mt: "30px",
                ml: "10px",
                justifyContent: "flex-start",
                mb: "30px",
              }}
            >
              <Chip
                label="Random Forest Algorithm"
                onDelete
                sx={{ mr: "20px" }}
              />
              <Chip label="K-Means Clustering" onDelete />
            </Box>
            <Button
              sx={{ mb: "10px", ml: "80%", mr: "3%" }}
              variant="contained"
              color="success"
            >
              Analyze
            </Button>
          </Box>
        </Box>

        <Box class="analysis_summary" sx={{ mt: "40px" }}>
          <Box
            sx={{
              bgcolor: "#000000",
              height: "10vh",
              margin: "0",
              display: "flex",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                pt: "10px",
                pl: "5px",
                fontFamily: "Inter",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "#FFFFFF",
                mb: 0,
                mr: "20px",
              }}
              gutterBottom
            >
              Analysis Summary
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "#DED4D4",
              margin: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                mt: "30px",
                bgcolor: "white",
                ml: "10px",
                width: "50%",
                mb: "30px",
                paddingLeft: "10px",
              }}
            >
              <Typography variant="h5">ML: Random Forest Summary</Typography>

              <Typography variant="body1">
                <strong>Insight Type:</strong> Behavior Identification
              </Typography>

              <Typography variant="body1">
                <strong>Identified Behavior:</strong> Asking a definition
              </Typography>

              <Typography variant="body1">
                <strong>Accuracy of the Module:</strong> 92.34%
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AnalysisPage;
