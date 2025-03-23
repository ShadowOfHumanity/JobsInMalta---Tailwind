

const GeneralSpinner = () => {
  return (
    <>
    <div style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "2.8rem",
      width: "2.8rem"
    }}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
        <div 
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100%",
            width: "100%",
            transform: `rotate(${rotation}deg)`
          }}
        >
          <style>
            {`
              @keyframes pulse0112 {
                0%, 100% {
                  transform: scale(0);
                  opacity: 0.5;
                }
                50% {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            `}
          </style>
          <div 
            style={{
              content: '',
              height: "20%",
              width: "20%",
              borderRadius: "50%",
              backgroundColor: "currentColor",
              transform: "scale(0)",
              opacity: 0.5,
              animation: `pulse0112 0.9s ease-in-out infinite`,
              animationDelay: `${-0.875 * (index / 8)}s`,
              boxShadow: "0 0 20px rgba(18, 31, 53, 0.3)"
            }}
          />
        </div>
      ))}
    </div>
  </>
  )
}

export default GeneralSpinner