import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$md",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    lineHeight: 1.4,
  },

  a: {
    marginTop: "5rem",
    display: "block",
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ImageContainer = styled("div", {
  display: "flex",
});

export const ImageBackground = styled("div", {
  width: "100%",
  maxWidth: 130,
  height: 130,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 100,
  padding: "0.25rem",
  marginTop: "4rem",
  marginBottom: "2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",

  "&:not(:first-child)": {
    marginLeft: -45,
  },

  img: {
    objectFit: "cover",
  },
});
