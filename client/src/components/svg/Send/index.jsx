const Send = ({ color = "#ffffff" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_3511_7520)">
      <path
        d="M18.3346 1.6665L9.16797 10.8332M18.3346 1.6665L12.5013 18.3332L9.16797 10.8332M18.3346 1.6665L1.66797 7.49984L9.16797 10.8332"
        stroke={color}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3511_7520">
        <rect width="20" height="20" fill={color} />
      </clipPath>
    </defs>
  </svg>
);

export default Send;
