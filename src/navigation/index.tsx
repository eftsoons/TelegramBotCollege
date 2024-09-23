import { Navigate, Route, Router, Routes } from "react-router-dom";
import { TabBar } from "../components";
import { useEffect, useMemo } from "react";
import {
  initBackButton,
  initInitData,
  initNavigator,
} from "@telegram-apps/sdk";
import { useIntegration } from "@telegram-apps/react-router-integration";
import {
  Call,
  Group,
  Main,
  Schedule,
  Teacher,
  Wait,
  Headman,
  Favourites,
} from "../pages";

export default ({
  JsonData,
  infogroup,
  setinfogroup,
  snackbar,
  setsnackbar,
  favourites,
}: {
  JsonData: Record<string, string>[] | undefined;
  infogroup: string | undefined;
  setinfogroup: Function;
  snackbar: null | Element;
  setsnackbar: Function;
  favourites: Array<{ name: string; type: string }> | undefined;
}) => {
  const navigator = useMemo(() => initNavigator("College39bot"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  const initData = initInitData();

  useEffect(() => {
    if (initData?.startParam) {
      const path = decodeURIComponent(atob(initData.startParam));

      reactNavigator.push(path);
      localStorage.setItem(
        "Expand",
        JSON.stringify([false, false, false, false, false, false])
      );
    } else {
      const menu = localStorage.getItem("Menu");
      const name = localStorage.getItem("Data");

      if (menu == "group" || menu == "teacher" || menu == "office") {
        reactNavigator.push(`/group/${menu}`);
      } else if (menu && menu.includes("next")) {
        reactNavigator.push(`/schedule/${menu.split("next")[0]}/${name}`);
      } else if (menu == "teacherinfo") {
        reactNavigator.push(`/teacherinfo/${name}`);
      } else if (menu == "favourites") {
        reactNavigator.push(`/favourites`);
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
              (infogroup || infogroup == "") && favourites ? (
                <Main
                  reactNavigator={reactNavigator}
                  infogroup={infogroup}
                  snackbar={snackbar}
                  setsnackbar={setsnackbar}
                  favourites={favourites}
                />
              ) : (
                <Wait />
              )
            }
          />
          <Route
            path={"/group/:grouptype"}
            element={
              JsonData && (infogroup || infogroup == "") && favourites ? (
                <Group
                  JsonDataResponse={JsonData}
                  infogroup={infogroup}
                  reactNavigator={reactNavigator}
                  favourites={favourites}
                />
              ) : (
                <Wait />
              )
            }
          />
          <Route
            path={"/schedule/:grouptype/:nameparams"}
            element={
              JsonData && (infogroup || infogroup == "") && favourites ? (
                <Schedule
                  snackbar={snackbar}
                  JsonData={JsonData}
                  infogroup={infogroup}
                  reactNavigator={reactNavigator}
                  setinfogroup={setinfogroup}
                  setsnackbar={setsnackbar}
                  favourites={favourites}
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
          <Route
            path={"/favourites"}
            element={
              favourites ? (
                <Favourites
                  favourites={favourites}
                  reactNavigator={reactNavigator}
                />
              ) : (
                <Wait />
              )
            }
          />
          <Route path={"/call"} Component={Call} />
          <Route path={"/headman"} Component={Headman} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};
