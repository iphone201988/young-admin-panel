import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [changePassword, { data, isLoading }] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [form, setForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const toggleVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) {
      toast.error("Please enter current password.");
      return;
    }
    if (!form.new) {
      toast.error("Please enter new password.");
      return;
    }
    if (!form.confirm) {
      toast.error("Please confirm password.");
      return;
    }
    if (form.new !== form.confirm) {
      toast.error("New password and confirnm password do not match.");
      return;
    }
    if (form.new.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    // setForm({
    //   current: "",
    //   new: "",
    //   confirm: "",
    // });

    setShowPassword({
      current: false,
      new: false,
      confirm: false,
    });

    changePassword({
      currentPassword: form.current,
      newPassword: form.new,
    })
      .unwrap()
      .catch((error: any) => toast.error(error?.data?.message));
  };

  useEffect(() => {
    if (data?.success) {
      toast.success(data?.message);
    }
  }, [data]);

  return (
    <div className=" bg-gray-50  flex justify-center px-4 sm:px-6 lg:px-20 py-10">
      <div className=" bg-white shadow-lg rounded-xl p-2 sm:p-8 md:p-10 w-full ">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Change Password
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                name="current"
                value={form.current}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => toggleVisibility("current")}
                tabIndex={-1}
              >
                {showPassword.current ? <EyeOpenIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block font-medium mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="new"
                value={form.new}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => toggleVisibility("new")}
                tabIndex={-1}
              >
                {showPassword.new ? <EyeOpenIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => toggleVisibility("confirm")}
                tabIndex={-1}
              >
                {showPassword.confirm ? <EyeOpenIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Change password
          </Button>
        </form>
      </div>
    </div>
  );
};

const EyeOffIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.05 10.05 0 0 1 12 19c-5 0-9.27-3.11-11-7.5a11.93 11.93 0 0 1 2.26-3.26M1 1l22 22M9.88 9.88A3 3 0 0 1 14.12 14.12" />
  </svg>
);

const EyeOpenIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default Settings;
