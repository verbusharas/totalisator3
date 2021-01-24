package lt.verbus.totalisator.service.exception;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(Long id) {
        super("Entry with id: " + id + " was not found!");
    }
}
