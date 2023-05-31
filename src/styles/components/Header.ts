import { styled } from "../../styles";

export const HeaderContainer = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  button: {
    position: "relative",
    backgroundColor: "$gray800",
    color: "$white",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      opacity: 0.8,
    },

    div: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 12,
      position: "absolute",
      width: 24,
      height: 24,
      right: -12,
      top: -12,
      background: "#00875F",
      border: "3px solid #121214",
      borderRadius: "1000px",
    },
  },
});
