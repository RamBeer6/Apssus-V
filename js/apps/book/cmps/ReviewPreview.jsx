export function ReviewPreview({ review, showStars, onRemoveReview }) {
    return <div key={review.id} className="review-details">
        <h4>{review.fullName}</h4>
        <button className="btn-remove-review" onClick={() => onRemoveReview(review.id)}>×</button>
        <h5 className="gray">{review.date}</h5>
        <h4>{showStars(review.rating)}</h4>
        <p>{review.txt}</p>
    </div>
}