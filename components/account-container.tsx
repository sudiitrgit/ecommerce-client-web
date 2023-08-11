interface AccountContainerProps {
    children: React.ReactNode
}

const AccountContainer: React.FC<AccountContainerProps> = ({
    children
}) => {
    return ( 
        <div className="h-full w-full flex flex-row mt-10 justify-center text-gray-600">
            <div className="grid grid-cols-4 border-2 rounded-md shadow-md h-4/5 w-2/3 ">
                {children}
            </div>
        </div>
     );
}
 
export default AccountContainer;