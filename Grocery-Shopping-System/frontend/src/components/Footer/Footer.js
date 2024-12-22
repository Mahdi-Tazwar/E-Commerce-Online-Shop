const Footer = () => {
    return (
        <div className="d-flex justify-content-between align-items-center w-100" style={{minHeight: "10vh", padding: "20px 100px", backgroundColor: "#eff6e0"}}>
            <h6>Grocery Mart</h6>
            <div className="d-flex align-items-center gap-2">
                <a href="#" style={{textDecoration: "none", color: "black"}}>About</a>
                <a href="#" style={{textDecoration: "none", color: "black"}}>Privacy</a>
                <a href="#" style={{textDecoration: "none", color: "black"}}>Contact</a>
                <a href="#" style={{textDecoration: "none", color: "black"}}>FAQ</a>
            </div>
        </div>
    )
}

export default Footer;