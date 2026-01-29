export const PersonalInformation = ({ data }: { data: User }) => {
  return (
    <div className="user-detail">
      <h2>Personal Information</h2>
      <ul>
        <li>
          <span className="detail-title">Full name</span>
          <span className="detail-value">
            {data.f_name} {data.l_name}
          </span>
        </li>
        <li>
          <span className="detail-title">phone number</span>
          <span className="detail-value">{data.phone}</span>
        </li>
        <li>
          <span className="detail-title">email address</span>
          <span className="detail-value">{data.email}</span>
        </li>
        <li>
          <span className="detail-title">bvn</span>
          <span className="detail-value">{data.bvn}</span>
        </li>
        <li>
          <span className="detail-title">gender</span>
          <span className="detail-value">{data.gender}</span>
        </li>
        <li>
          <span className="detail-title">marital status</span>
          <span className="detail-value">{data.relationship}</span>
        </li>
        <li>
          <span className="detail-title">children</span>
          <span className="detail-value">
            {data.children === 0 ? 'None' : data.children}
          </span>
        </li>
        <li>
          <span className="detail-title">type of residence</span>
          <span className="detail-value">{data.residence}</span>
        </li>
      </ul>
    </div>
  );
};
