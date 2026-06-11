export default function ExperienceForm({ action, item, submitLabel = "Save experience" }) {
  return (
    <form className="admin-form" action={action}>
      <div className="form-grid">
        <label>
          <span>Company / Institution</span>
          <input name="company" defaultValue={item?.company || ""} required />
        </label>
        <label>
          <span>Role / Title</span>
          <input name="role" defaultValue={item?.role || ""} required />
        </label>
        <label>
          <span>Start date</span>
          <input name="startDate" defaultValue={item?.startDate || ""} required />
        </label>
        <label>
          <span>End date</span>
          <input name="endDate" defaultValue={item?.endDate || ""} required />
        </label>
      </div>
      <label>
        <span>Location</span>
        <input name="location" defaultValue={item?.location || ""} />
      </label>
      <label>
        <span>Description</span>
        <textarea name="description" rows="5" defaultValue={item?.description || ""} required />
      </label>
      <label>
        <span>Highlights, one per line</span>
        <textarea name="highlights" rows="5" defaultValue={(item?.highlights || []).join("\n")} />
      </label>
      <label>
        <span>Order</span>
        <input name="order" type="number" defaultValue={item?.order || 0} />
      </label>
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
