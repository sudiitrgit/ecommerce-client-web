import SendOtpForm from "./components/send-otp-form";

const User =async () => {
    return ( 
        <div className="flex min-h-full flex-col justify-center py-6 bg-gray-100">
            <SendOtpForm/>
        </div>
     );
}
 
export default User;