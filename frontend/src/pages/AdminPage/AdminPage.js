import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashboardLineChart from "../../components/DashboardLineChart/DashboardLineChart";
import { useTheme, useMediaQuery } from "@mui/material";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import { queryKeys } from "../../constants";
import { getAdminStatDetails } from "../../services/userService";
import { useUser } from "../../contexts/UserContext";
import "./AdminPage.css";

function AdminPage() {
  const theme = useTheme();
  const lessThanSm = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const lessThanLg = useMediaQuery(theme.breakpoints.down("lg"));

  const queryClient = useQueryClient();
  const { user } = useUser();

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys["getAdminStatDetails"]],
    queryFn: () => getAdminStatDetails(user),
    enabled: false,
  });

  useEffect(() => {
    // Enable the query when the user object becomes available
    if (user) {
      queryClient.prefetchQuery([queryKeys["getAdminStatDetails"]], () =>
        getAdminStatDetails(user)
      );
    }
  }, [user]);

  return (
    // <span className="admin-page" style={{ marginTop: "-40px" }}>
    <div className="container" style={{ marginTop: "50px" }}>
      <Box
        className="summaries"
        //{lessThanSm ? 0 : {lessThanMd ? 18 : 14}}
        sx={{
          display: "flex",
          flexDirection: lessThanMd ? "column" : "row",
          justifyContent: "center",
          mt: lessThanMd ? 5 : 0,
        }}
      >
        <div className="summary1">
          <DashboardCard
            icon={<ExtensionIcon sx={{ color: "green" }} />}
            title="Active Plugins"
            count={data?.compatiblePluginCount}
          />
        </div>
        <span style={{ marginLeft: "50px" }}>{"\u00A0"}</span>
        <div className="summary2">
          <DashboardCard
            icon={<ExtensionIcon sx={{ color: "red" }} />}
            title="Inactive Plugins"
            count={data?.incompatiblePluginCount}
          />
        </div>
        <span style={{ marginLeft: "50px" }}>{"\u00A0"}</span>
        <div className="summary3">
          <DashboardCard
            icon={<PersonIcon sx={{ color: "#00245A" }} />}
            title="Total Users"
            count={data?.userCount}
          />
        </div>
      </Box>

      <Box
        className="summaries"
        //{lessThanSm ? 0 : {lessThanMd ? 18 : 14}}
        sx={{
          display: "flex",
          flexDirection: lessThanMd ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          mt: lessThanMd ? 5 : 5,
        }}
      >
        <DashboardLineChart
          title="Plugin Growth"
          labels={data?.pluginGrowth.label}
          data={data?.pluginGrowth.data}
        />
        <span style={{ marginLeft: lessThanLg ? "10px" : "50px" }}>
          {"\u00A0"}
        </span>
        <span style={{ marginTop: lessThanMd ? 2 : 0 }}>{"\u00A0"}</span>
        <DashboardLineChart
          title="User Growth"
          labels={data?.userGrowth.label}
          data={data?.userGrowth.data}
        />
      </Box>
    </div>

    // </span>
  );
}

export default AdminPage;
