import { useEffect } from "react";
import { useIsVisibleInViewPort, useNavBar } from "../hooks";
import {
  ACTIVITIES,
  SPA,
  DINE,
  OVERVIEW,
  HIGhLIGHTS,
  FEATURES,
  ISLAND,
} from "../constants";
export const useSetNavActiveLinks = ({
  dineRef,
  spaRef,
  featuresRef,
  islandRef,
  overviewRef,
  highlightsRef,
  activitiesRef,
}) => {
  const { setActiveNavLink } = useNavBar();
  const isDineVisible = useIsVisibleInViewPort(dineRef, "-200px");
  const isOverviewVisible = useIsVisibleInViewPort(overviewRef, "-200px");
  const isFeaturesVisible = useIsVisibleInViewPort(featuresRef, "-200px");
  const isIslandVisible = useIsVisibleInViewPort(islandRef, "-200px");
  const isSpaVisible = useIsVisibleInViewPort(spaRef, "-200px");
  const isHiglightsVisible = useIsVisibleInViewPort(highlightsRef, "-200px");
  const isActivitiesVisible = useIsVisibleInViewPort(activitiesRef, "-200px");

  useEffect(() => {
    if (isOverviewVisible) {
      setActiveNavLink(OVERVIEW);
    }
    if (isFeaturesVisible) {
      setActiveNavLink(FEATURES);
    }
    if (isIslandVisible) {
      setActiveNavLink(ISLAND);
    }
    if (isHiglightsVisible) {
      setActiveNavLink(HIGhLIGHTS);
    }
    if (isDineVisible) {
      setActiveNavLink(DINE);
    }
    if (isSpaVisible) {
      setActiveNavLink(SPA);
    }
    if (isActivitiesVisible) {
      setActiveNavLink(ACTIVITIES);
    }
  }, [
    isDineVisible,
    isIslandVisible,
    isFeaturesVisible,
    isSpaVisible,
    isActivitiesVisible,
    isHiglightsVisible,
    isOverviewVisible,
  ]);
};
