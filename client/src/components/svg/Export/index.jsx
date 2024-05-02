const ExportIcon = ({ color = "#f6f6f6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
  >
    <path
      d="M14.5009 7.53033C14.7938 7.82322 15.2687 7.82322 15.5616 7.53033C15.8545 7.23744 15.8545 6.76256 15.5616 6.46967L12.5616 3.46967C12.2687 3.17678 11.7938 3.17678 11.5009 3.46967L8.50092 6.46967C8.20803 6.76256 8.20803 7.23744 8.50092 7.53033C8.79381 7.82322 9.26869 7.82322 9.56158 7.53033L11.2812 5.81066V14C11.2812 14.4142 11.617 14.75 12.0312 14.75C12.4455 14.75 12.7812 14.4142 12.7812 14V5.81066L14.5009 7.53033Z"
      fill={color}
    />
    <path
      d="M20.7812 12C20.7812 11.5858 20.4455 11.25 20.0312 11.25C19.617 11.25 19.2812 11.5858 19.2812 12C19.2812 16.0041 16.0353 19.25 12.0312 19.25C8.02718 19.25 4.78125 16.0041 4.78125 12C4.78125 11.5858 4.44546 11.25 4.03125 11.25C3.61704 11.25 3.28125 11.5858 3.28125 12C3.28125 16.8325 7.19876 20.75 12.0312 20.75C16.8637 20.75 20.7812 16.8325 20.7812 12Z"
      fill={color}
    />
  </svg>
);

export default ExportIcon;