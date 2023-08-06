interface AuthProtectedProps {
  children: React.ReactNode;
}

const AuthProtected = (props: AuthProtectedProps) => {
  const { children } = props;

  return (
    <>
      <div id="auth-protected">{children}</div>
    </>
  );
};

export default AuthProtected;
