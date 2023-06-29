'use client';

const Navbar = () => {
  return (
    <>
      <div className="flex flex-row w-full px-4 py-4">
        <div className="ml-auto">
          <div
            id="profile-picture"
            className="w-12 h-12 bg-zinc-700 rounded-full"
          ></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
