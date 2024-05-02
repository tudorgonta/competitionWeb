const CheckCircle = ({ color = "#EDF67D" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="41"
    height="41"
    viewBox="0 0 41 41"
    fill="none"
  >
    <path
      d="M27.2179 17.5899C27.706 17.1018 27.706 16.3103 27.2179 15.8222C26.7297 15.334 25.9383 15.334 25.4501 15.8222L18.0007 23.2716L15.5512 20.8222C15.063 20.334 14.2716 20.334 13.7834 20.8222C13.2953 21.3103 13.2953 22.1018 13.7834 22.5899L17.1168 25.9233C17.6049 26.4114 18.3964 26.4114 18.8845 25.9233L27.2179 17.5899Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.5007 2.95605C10.6055 2.95605 2.58398 10.9776 2.58398 20.8727C2.58398 30.7678 10.6055 38.7894 20.5007 38.7894C30.3958 38.7894 38.4173 30.7678 38.4173 20.8727C38.4173 10.9776 30.3958 2.95605 20.5007 2.95605ZM5.08398 20.8727C5.08398 12.3583 11.9863 5.45605 20.5007 5.45605C29.015 5.45605 35.9173 12.3583 35.9173 20.8727C35.9173 29.3871 29.015 36.2894 20.5007 36.2894C11.9863 36.2894 5.08398 29.3871 5.08398 20.8727Z"
      fill={color}
    />
  </svg>
);

export default CheckCircle;