export default function ProjectForm({ action, project, submitLabel = "Save project" }) {
  return (
    <form className="admin-form" action={action}>
      <div className="form-grid">
        <label>
          <span>Title</span>
          <input name="title" defaultValue={project?.title || ""} required />
        </label>
        <label>
          <span>Slug</span>
          <input name="slug" defaultValue={project?.slug || ""} />
        </label>
        <label>
          <span>Category</span>
          <input name="category" defaultValue={project?.category || ""} required />
        </label>
        <label>
          <span>Year</span>
          <input name="year" defaultValue={project?.year || ""} required />
        </label>
      </div>
      <label>
        <span>Description</span>
        <textarea name="description" rows="5" defaultValue={project?.description || ""} required />
      </label>
      <div className="form-grid">
        <label>
          <span>Demo URL</span>
          <input name="link" defaultValue={project?.link || ""} />
        </label>
        <label>
          <span>Repository URL</span>
          <input name="repository" defaultValue={project?.repository || ""} />
        </label>
      </div>
      <div className="form-grid compact">
        <label>
          <span>Order</span>
          <input name="order" type="number" defaultValue={project?.order || 0} />
        </label>
        <label className="checkbox-row">
          <input name="featured" type="checkbox" defaultChecked={Boolean(project?.featured)} />
          <span>Featured project</span>
        </label>
      </div>
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
