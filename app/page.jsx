import TicketCard from './(components)/TicketCard';

const getTickets = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/Tickets', {
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {}
};

const Dashboard = async () => {
  const { tickets } = await getTickets();
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  return (
    <div className="p-5">
      {tickets &&
        uniqueCategories?.map((uniqueCategory) => (
          <div className="mb-4" key={uniqueCategory}>
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((fTicket, _index) => (
                  <TicketCard id={_index} key={_index} ticket={fTicket} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
