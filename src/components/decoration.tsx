const Decoration = ({radius}: {radius: string}) => {
  return (
    <div className={`bg-yellow-600 ${radius} outline-offset-4`}>
        <div className={`${radius} decoration translate-y-[-5px]`}></div>
    </div>
  );
}

export default Decoration;