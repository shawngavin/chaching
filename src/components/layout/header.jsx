import Logo from "../../assets/robo-logo.png"

export const Header = () => (
    <div style={{ paddingLeft: 25 }}>
        <h3 style={{ color: "#974bb7" }}>
            <img src={Logo} alt='Page Logo' style={{ width: 40 }} />
            <strong>Cha-Ching</strong>
        </h3>
    </div>
)
