import styles from '../styles/ReviewHours.module.css';
import Button from '@mui/material/Button';

export default function Hours() {
    return (
        <div className={styles.page}>
            <h1>Review Hours</h1>
            <div className={styles.sectionTable}>
                <table>
                    <colgroup>
                        <col style={{ width: "8%" }} />
                        <col style={{ width: "14%" }} />
                        <col style={{ width: "33%" }} />
                        <col style={{ width: "6%" }} />
                        <col style={{ width: "3%" }} />
                        <col style={{ width: "15%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Evidence</th>
                            <th>Hrs</th>
                            <th>Verdict</th>
                        </tr>
                    </thead>
                    {/* loop data */}
                    <tbody>
                        <tr>
                            <td>02-16 20:38:40</td>
                            <td><a href="#">FirstName MiddleName LastName</a></td>
                            <td>Logging hours for the Empowerment Mentoring Program in WIT with my mentor</td>
                            <td><a href="#">view.pdf</a></td>
                            <td>24</td>
                            <td><Button variant="contained" color="success" style={{ margin: "1px" }}>Approve</Button> <Button variant="contained" color="error" style={{ margin: "1px" }}>Reject</Button></td>
                        </tr>
                        <tr>
                            <td>02-16 21:38:40</td>
                            <td><a href="#">FirstName1 LastName1</a></td>
                            <td>AAAAA</td>
                            <td><a href="#">view.pdf</a></td>
                            <td>24</td>
                            <td><Button variant="contained" color="success" style={{ margin: "1px" }}>Approve</Button> <Button variant="contained" color="error" style={{ margin: "1px" }}>Reject</Button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
