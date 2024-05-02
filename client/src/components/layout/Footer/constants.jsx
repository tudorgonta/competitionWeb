import Instagram from "../../svg/socials/Instagram";
import YouTube from "../../svg/socials/YouTube";
import Visa from "../../svg/payments/Visa";
import Mastercard from "../../svg/payments/Mastercard";
import MNP from "../../svg/payments/MNP";

const FOOTER_LINKS = {
  main: [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Contact Us",
      path: "/contact",
    },
    {
      label: "Terms & Conditions",
      path: "/terms",
    },
  ],
  socials: [
    {
      icon: <YouTube />,
      path: "https://www.youtube.com/",
    },
    {
      icon: <Instagram />,
      path: "https://www.instagram.com/",
    }
  ],
  payments: [
    {
      icon: <Visa />,
      path: "#",
    },
    {
      icon: <Mastercard />,
      path: "#",
    },
    {
      icon: <MNP />,
      path: "#",
    },
  ],
};

export default FOOTER_LINKS;
