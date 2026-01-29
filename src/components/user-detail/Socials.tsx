export const Socials = ({ data }: { data: User }) => {
  return (
    <div className="user-detail">
      <h2>Socials</h2>
      <ul>
        {data.twitter && (
          <li>
            <span className="detail-title">twitter</span>
            <span className="detail-value">{data.twitter}</span>
          </li>
        )}
        {data.facebook && (
          <li>
            <span className="detail-title">facebook</span>
            <span className="detail-value">{data.facebook}</span>
          </li>
        )}
        {data.instagram && (
          <li>
            <span className="detail-title">instagram</span>
            <span className="detail-value">{data.instagram}</span>
          </li>
        )}
      </ul>
    </div>
  );
};
