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

  const navigateBack = () => {
    navigate(-1);
  };

  return {
    navigateToGroupMemberPage,
    navigateToLandingPage,
    navigateToCostItemsPage,
    navigateToCalculationPage,
    navigateBack,
  };
};
