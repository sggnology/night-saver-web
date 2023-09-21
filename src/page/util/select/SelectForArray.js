export default function SelectForArray({options, onChange, value}) {

  const optionsWithNone = ['not selected', ...options];

  return (
    <select onChange={onChange} value={value}>
      {optionsWithNone.map((option, index) => {
        return (
          <option key={index} value={option}>{option}</option>
        )
      })}
    </select>
  )
}