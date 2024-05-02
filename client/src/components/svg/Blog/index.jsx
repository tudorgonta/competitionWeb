const Clock = ({ color }) => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.5 5.33301V7.99967L10.1667 9.66634"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.16634 2.22489C6.14692 1.65766 7.28538 1.33301 8.49967 1.33301C12.1816 1.33301 15.1663 4.31778 15.1663 7.99967C15.1663 11.6816 12.1816 14.6663 8.49967 14.6663C4.81778 14.6663 1.83301 11.6816 1.83301 7.99967C1.83301 6.78538 2.15766 5.64692 2.72489 4.66634"
      stroke={color}
      strokeLinecap="round"
    />
  </svg>
);

export default Clock;
