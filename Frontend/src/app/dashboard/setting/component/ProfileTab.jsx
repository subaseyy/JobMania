import { useState } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";

export default function ProfileTab() {
  const [profilePhoto, setProfilePhoto] = useState("/hero.jpg");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [accountType, setAccountType] = useState("Job Seeker");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!phone.trim()) newErrors.phone = "Phone Number is required.";
    else if (!/^\+?\d{7,15}$/.test(phone))
      newErrors.phone = "Invalid phone number.";

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      newErrors.email = "Invalid email address.";

    if (!dob) newErrors.dob = "Date of Birth is required.";
    if (!gender) newErrors.gender = "Gender is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 3000);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!validate()) return;
    setFullName("");
    setPhone("");
    setEmail("");
    setDob("");

    const profileData = {
      profilePhoto,
      fullName,
      phone,
      email,
      dob,
      gender,
      accountType,
    };
    console.log("Saving profile:", profileData);
  };

  return (
    <div className="p-6">
      <div className="mb-6 border-b pb-6">
        <h2 className="font-epilogue font-[600] text-lg leading-[160%] text-[#202430] mb-1">
          Basic Information
        </h2>
        <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F]">
          This is your personal information that you can update anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[40%_40%_20%] gap-6 border-b border-gray-200 pb-6 mb-6">
        <div>
          <p className="font-epilogue font-[600] text-base leading-[160%] text-[#202430] mb-2">
            Profile Photo
          </p>
          <p className="font-epilogue font-[400] text-base leading-[160%] text-[#515B6F] max-w-[237px]">
            This image will be shown publicly as your profile picture, it will
            help recruiters recognize you!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Image
            height={144}
            width={144}
            src={profilePhoto}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover"
          />
          <label className="flex-1 cursor-pointer border-2 border-dashed border-[#2E60F3] rounded-lg px-4 py-12 text-center font-epilogue font-[500] text-base leading-[160%]">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <p className="text-[#4640DE]">
              Click to replace{" "}
              <span className="text-[#25324B]">or drag and drop</span>
            </p>
            <p className="font-[400] text-[#7C8493]">
              SVG, PNG, JPG or GIF (max. 400 x 400px)
            </p>
          </label>
        </div>
      </div>

      <div className="border-b border-gray-200 pb-6 mb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[40%_40%_20%] gap-6">
        <p className="font-epilogue font-[600] text-base leading-[160%] text-[#25324B] mb-4">
          Personal Details
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block font-epilogue font-[600] text-base text-[#515B6F] mb-1">
              Full Name <span className="text-[#FF6550]">*</span>
            </label>
            <input
              type="text"
              placeholder="Jake Gyll"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 font-epilogue ${
                errors.fullName
                  ? "border-[#FF6550] focus:ring-[#FF6550]"
                  : "border-[#D6DDEB] focus:ring-[#2E60F3]"
              }`}
            />
            {errors.fullName && (
              <p className="text-[#FF6550] text-sm mt-1">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label className="block font-epilogue font-[600] text-base text-[#515B6F] mb-1">
              Phone Number <span className="text-[#FF6550]">*</span>
            </label>
            <input
              type="text"
              placeholder="+44 1245 572 135"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 font-epilogue ${
                errors.phone
                  ? "border-[#FF6550] focus:ring-[#FF6550]"
                  : "border-[#D6DDEB] focus:ring-[#2E60F3]"
              }`}
            />
            {errors.phone && (
              <p className="text-[#FF6550] text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="block font-epilogue font-[600] text-base text-[#515B6F] mb-1">
              Email <span className="text-[#FF6550]">*</span>
            </label>
            <input
              type="email"
              placeholder="Jakegyll@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 font-epilogue ${
                errors.email
                  ? "border-[#FF6550] focus:ring-[#FF6550]"
                  : "border-[#D6DDEB] focus:ring-[#2E60F3]"
              }`}
            />
            {errors.email && (
              <p className="text-[#FF6550] text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block font-epilogue font-[600] text-base text-[#515B6F] mb-1">
              Date of Birth <span className="text-[#FF6550]">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={`w-full rounded-md border px-3 py-2 pr-10 focus:outline-none focus:ring-2 font-epilogue ${
                  errors.dob
                    ? "border-[#FF6550] focus:ring-[#FF6550]"
                    : "border-[#D6DDEB] focus:ring-[#2E60F3]"
                }`}
              />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
            {errors.dob && (
              <p className="text-[#FF6550] text-sm mt-1">{errors.dob}</p>
            )}
          </div>
          <div>
            <label className="block font-epilogue font-[600] text-base text-[#515B6F] mb-1">
              Gender <span className="text-[#FF6550]">*</span>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 font-epilogue ${
                errors.gender
                  ? "border-[#FF6550] focus:ring-[#FF6550]"
                  : "border-[#D6DDEB] focus:ring-[#2E60F3]"
              }`}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && (
              <p className="text-[#FF6550] text-sm mt-1">{errors.gender}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1md:grid-cols-2 xl:grid-cols-[40%_40%_20%] gap-6">
        <div>
          <p className="font-epilogue font-[600] text-base text-[#25324B] mb-3">
            Account Type
          </p>
          <p className="font-epilogue font-[400] text-base text-[#515B6F] mb-4">
            You can update your account type
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="radio"
              id="jobSeeker"
              name="accountType"
              checked={accountType === "Job Seeker"}
              onChange={() => setAccountType("Job Seeker")}
              className="mt-1 text-[#2E60F3] focus:ring-[#2E60F3]"
            />
            <label htmlFor="jobSeeker">
              <p className="font-epilogue font-[500] text-base text-[#25324B]">
                Job Seeker
              </p>
              <p className="font-epilogue font-[400] text-base text-[#515B6F]">
                Looking for a job
              </p>
            </label>
          </div>
          <div className="flex items-start space-x-3">
            <input
              type="radio"
              id="employer"
              name="accountType"
              checked={accountType === "Employer"}
              onChange={() => setAccountType("Employer")}
              className="mt-1 text-[#2E60F3] focus:ring-[#2E60F3]"
            />
            <label htmlFor="employer">
              <p className="font-epilogue font-[500] text-base text-[#25324B]">
                Employer
              </p>
              <p className="font-epilogue font-[400] text-base text-[#515B6F]">
                Hiring, sourcing candidates, or posting jobs
              </p>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#4640DE] hover:scale-[1.03] transition-all duration-300 ease-in-out text-white font-epilogue font-[500] text-base px-6 py-3"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
