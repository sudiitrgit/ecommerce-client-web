const LogoutFunction = () => {
    localStorage.removeItem("user-storage")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("phone")
    localStorage.removeItem("addresses")
    localStorage.removeItem("orders-storage")
    localStorage.removeItem("cart-storage")
}
 
export default LogoutFunction;