const Button = ({ setDialogOpen }) => {
  return (
    <button onClick={() => setDialogOpen(true)} className="btn btn-primary">
      Take a picture
    </button>
  );
};

export default Button;
