export const Guarantor = ({ data }: { data: User }) => {
  return (
    <div className="user-detail">
      <h2>Guarantor</h2>
      <ul className="guarantor-list">
        {data.guarantor.map((guarantor) => (
          <li key={guarantor.id} className="guarantor-list-item">
            <div className="guarantor">
              <div>
                <span className="detail-title">full name</span>
                <span className="detail-value">
                  {guarantor.f_name} {guarantor.l_name}
                </span>
              </div>
              <div>
                <span className="detail-title">phone number</span>
                <span className="detail-value">{guarantor.phone}</span>
              </div>
              <div>
                <span className="detail-title">email</span>
                <span className="detail-value">{guarantor.email}</span>
              </div>
              <div>
                <span className="detail-title">relationship</span>
                <span className="detail-value">{guarantor.relationship}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
