import { useState } from "react";

export default function ManagerPanel({
  seatConfig,
  setSeatConfig,
}) {
  const [localConfig, setLocalConfig] =
    useState(seatConfig);

  const handleChange = (e) => {
    setLocalConfig({
      ...localConfig,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSave = () => {
    setSeatConfig(localConfig);
  };

  const buffer =
    localConfig.totalSeats -
    localConfig.members * localConfig.spotsPerMember;

  return (
    <div className="card">
      <h2>Manager Control Panel</h2>

      <div className="form-row">
        <input
          type="number"
          name="totalSeats"
          value={localConfig.totalSeats}
          onChange={handleChange}
          placeholder="Total Seats"
        />

        <input
          type="number"
          name="members"
          value={localConfig.members}
          onChange={handleChange}
          placeholder="Members"
        />

        <input
          type="number"
          name="spotsPerMember"
          value={localConfig.spotsPerMember}
          onChange={handleChange}
          placeholder="Spots per Member"
        />
      </div>

      <p>Buffer Seats: {buffer}</p>

      <button
        className="btn-book"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
}