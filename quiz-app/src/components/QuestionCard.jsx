// import React from "react";
// import he from "he";

// /**
//  * QuestionCard component to display a single true/false quiz question.
//  * 
//  * @param {Object} props
//  * @param {Function} props.next - callback handler when True/False is clicked
//  * @param {Object} props.question - question object containing text and category
//  * @param {number} props.number - current question number (1-based)
//  * @param {number} props.totalQuestion - total number of questions
//  * @param {number} props.time - time given per question
//  */
// export function QuestionCard({ next, question, number, totalQuestion, time }) {
//   function escapeHtml(word) {
//     return word ? he.decode(word) : "";
//   }

//   return (
//     <div className="box">
//       <div className="row-time">
//         <h3>
//           Question <span>{number}/{totalQuestion}</span>
//         </h3>
//         <h3> Time given: {time} </h3>
//       </div>
//       <div className="rowm">
//         <div className="col-6">
//           <h4>
//             Category : <span>{question?.category}</span>
//           </h4>
//         </div>
//       </div>
//       <div className="questions">
//         <span className="question">{escapeHtml(question?.question)}</span>
//       </div>
//       <div className="row-quest">
//         <div className="col">
//           <button onClick={() => next(question, "True")} className="btn">
//             True
//           </button>
//         </div>
//         <div className="col1">
//           <button onClick={() => next(question, "False")} className="btn-btn">
//             False
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
