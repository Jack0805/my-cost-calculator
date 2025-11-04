import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../shared";

export const useNavigateTo = () => {
  const navigate = useNavigate();

  const navigateToGroupMemberPage = () => {
    navigate(ROUTE.GROUP_MEMBER);
  };

  const navigateToLandingPage = () => {
    navigate(ROUTE.LANDING_PAGE);
  };

  const navigateToCostItemsPage = () => {
    navigate(ROUTE.COST_ITEMS);
  };

  const navigateToCalculationPage = () => {
    navigate(ROUTE.CALCULATION);
  };

  const navigateToAbout = () => {
    navigate(ROUTE.ABOUT);
  };

  const navigateToBlog = () => {
    navigate(ROUTE.BLOG);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const navigateToFaqPage = () => {
    navigate(ROUTE.FAQ);
  };

  return {
    navigateToGroupMemberPage,
    navigateToLandingPage,
    navigateToCostItemsPage,
    navigateToCalculationPage,
    navigateBack,
    navigateToFaqPage,
    navigateToAbout,
    navigateToBlog,
  };
};
