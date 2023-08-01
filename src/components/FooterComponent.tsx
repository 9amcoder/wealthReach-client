
const FooterComponent = () => {
    return (
        <footer style={{display: 'flex', flexDirection: 'row', backgroundColor: 'none', justifyContent: 'center'}}>
            <div>
                <p>&copy; {new Date().getFullYear()} Steve Sultan - McMaster University</p>
            </div>
        </footer>
    );
};

export default FooterComponent;