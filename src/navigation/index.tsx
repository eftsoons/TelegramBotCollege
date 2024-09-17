import { Navigate, Route, Router, Routes } from "react-router-dom";
import { TabBar } from "../components";
import { useEffect, useMemo } from "react";
import { initInitData, initNavigator } from "@telegram-apps/sdk";
import { useIntegration } from "@telegram-apps/react-router-integration";
import { Call, Group, Main, Schedule, Teacher, Wait } from "../pages";

export default ({
  JsonData,
  infogroup,
  setinfogroup,
  snackbar,
  setsnackbar,
}: {
  JsonData: Record<string, string>[] | undefined;
  infogroup: string | undefined;
  setinfogroup: Function;
  snackbar: null | Element;
  setsnackbar: Function;
}) => {
  const navigator = useMemo(() => initNavigator("College39bot"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  const initData = initInitData();

  useEffect(() => {
    console.log(initData);
    if (initData?.startParam) {
      reactNavigator.push(initData.startParam);
    }
  }, []);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes location={location}>
        <Route
          path="/"
          element={
            <TabBar
              pathname={location.pathname}
              reactNavigator={reactNavigator}
            />
          }
        >
          <Route
            index
            element={
              infogroup || infogroup == "" ? (
                <Main reactNavigator={reactNavigator} infogroup={infogroup} />
              ) : (
                <Wait />
              )
            }
          />
          <Route
            path={"/group/:grouptype"}
            element={
              JsonData && (infogroup || infogroup == "") ? (
                <Group
                  JsonDataResponse={JsonData}
                  infogroup={infogroup}
                  reactNavigator={reactNavigator}
                />
              ) : (
                <Wait />
              )
            }
          />
          <Route
            path={"/schedule/:grouptype/:nameparams/:key"}
            element={
              JsonData && (infogroup || infogroup == "") ? (
                <Schedule
                  snackbar={snackbar}
                  JsonData={JsonData}
                  infogroup={infogroup}
                  reactNavigator={reactNavigator}
                  setinfogroup={setinfogroup}
                  setsnackbar={setsnackbar}
                />
              ) : (
                <Wait />
              )
            }
          />
          <Route
            path={"/teacherinfo/:nameteacher"}
            element={<Teacher reactNavigator={reactNavigator} />}
          />
          <Route path={"/call"} Component={Call} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};
