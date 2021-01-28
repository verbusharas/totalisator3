package lt.verbus.totalisator.exception;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(Long id) {
        super("Entry with id: " + id + " was not found!");
    }

    public EntityNotFoundException(String message) {
        super(message);
    }
}
