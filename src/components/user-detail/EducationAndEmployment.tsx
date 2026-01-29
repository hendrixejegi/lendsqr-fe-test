import { formatNum } from '@/lib/utils';

export const EducationAndEmployment = ({ data }: { data: User }) => {
  return (
    <div className="user-detail">
      <h2>Education and Employment</h2>
      <ul>
        <li>
          <span className="detail-title">level of education</span>
          <span className="detail-value">{data.education}</span>
        </li>
        <li>
          <span className="detail-title">Employment status</span>
          <span className="detail-value">{data.employment.type}</span>
        </li>
        <li>
          <span className="detail-title">sector of Employment</span>
          <span className="detail-value">{data.employment.sector}</span>
        </li>
        <li>
          <span className="detail-title">duration of Employment</span>
          <span className="detail-value">{data.employment.duration}</span>
        </li>
        <li>
          <span className="detail-title">office email</span>
          <span className="detail-value">{data.office_email}</span>
        </li>
        <li>
          <span className="detail-title">monthly income</span>
          <span className="detail-value">
            &#8358;{formatNum(data.employment.income.min)}.00 - &#8358;
            {formatNum(data.employment.income.max)}.00
          </span>
        </li>
        <li>
          <span className="detail-title">loan repayment</span>
          <span className="detail-value">
            &#8358;{formatNum(data.repayment)}
          </span>
        </li>
      </ul>
    </div>
  );
};
