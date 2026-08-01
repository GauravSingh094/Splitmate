import type { PaginationParams, PaginatedResponse } from '@/types/api';

/**
 * Abstract base repository.
 *
 * All feature repositories extend this class and provide their own
 * concrete implementations. The abstract signatures enforce a consistent
 * interface across all resource types, making feature code predictable
 * and easier to test/mock.
 *
 * @example
 * class GroupRepository extends BaseRepository<Group, CreateGroupInput, UpdateGroupInput> {
 *   protected basePath = '/groups';
 *   // ... implement abstract methods
 * }
 */
export abstract class BaseRepository<TEntity, TCreate, TUpdate = Partial<TCreate>> {
  /** API path prefix for this resource (e.g. '/groups', '/expenses'). */
  protected abstract basePath: string;

  /**
   * Returns a paginated list of entities.
   */
  abstract findAll(params?: PaginationParams): Promise<PaginatedResponse<TEntity>>;

  /**
   * Returns a single entity by its ID.
   * Throws if the entity does not exist.
   */
  abstract findById(id: string): Promise<TEntity>;

  /**
   * Creates a new entity.
   */
  abstract create(data: TCreate): Promise<TEntity>;

  /**
   * Updates an existing entity by ID.
   */
  abstract update(id: string, data: TUpdate): Promise<TEntity>;

  /**
   * Deletes an entity by ID.
   */
  abstract delete(id: string): Promise<void>;
}
