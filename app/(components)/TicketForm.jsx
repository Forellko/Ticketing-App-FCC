'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const TicketForm = () => {
  const router = useRouter();
  const startingTicketData = {
    title: '',
    description: '',
    priority: 1,
    progress: 0,
    status: 'not started',
    category: 'Hardware problem',
  };

  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/Tickets', {
      method: 'POST',
      body: JSON.stringify({ formData }),
      'content-type': 'application/json',
    });

    if (!res.ok) {
      throw new Error('Failed to create Ticket.');
    }

    router.refresh();
    router.push('/');
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>Create Your Ticket</h3>
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          required
          value={formData.title}
        />
        <textarea
          className="resize-none"
          name="description"
          id="description"
          onChange={handleChange}
          value={formData.description}
          rows={5}
        />
        <label>Category</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>
        <label>Priority </label>
        <div>
          <input
            type="radio"
            name="priority"
            id="priority-1"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            type="radio"
            name="priority"
            id="priority-2"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            type="radio"
            name="priority"
            id="priority-3"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            type="radio"
            name="priority"
            id="priority-4"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            type="radio"
            name="priority"
            id="priority-5"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input type="submit" className="btn max-w-xs" value="Create Ticket" />
      </form>
    </div>
  );
};

export default TicketForm;
