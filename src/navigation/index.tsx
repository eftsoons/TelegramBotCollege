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
    if (initData?.startParam) {
      const path = decodeURIComponent(atob(initData.startParam));
      reactNavigator.push(path);
      //сделать по другому
    } else {
      const menu = localStorage.getItem("Menu");
      const name = localStorage.getItem("Data");
      const key = localStorage.getItem("DataIndex");

      if (menu == "group" || menu == "teacher" || menu == "office") {
        reactNavigator.push(`/group/${menu}`);
      } else if (menu && menu.includes("next")) {
        reactNavigator.push(
          `/schedule/${menu.split("next")[0]}/${name}/${key}`
        );
      } else if (menu == "teacherinfo") {
        reactNavigator.push(`/teacherinfo/${name}`);
      } else {
        reactNavigator.push("/");
      }
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
            element={
              <Teacher
                snackbar={snackbar}
                setsnackbar={setsnackbar}
                reactNavigator={reactNavigator}
              />
            }
          />
          <Route path={"/call"} Component={Call} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};
