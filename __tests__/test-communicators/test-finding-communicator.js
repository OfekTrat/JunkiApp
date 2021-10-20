import FindingCommunicator from "../../src/api_communicators/finding_communicator";
import Finding from "../../src/finding";
import { FindingNotFoundError } from "../../src/errors/finding_errors";
import Location from '../../src/location';


test("Get Existing Finding", async () => {
    const finding = await FindingCommunicator.get("test");
    expect(finding.id).toBe("test");
    expect(finding.location.longitude).toBe(1);
    expect(finding.location.latitude).toBe(1);
    expect(finding.image_hash).toBe("asdfgh");
    expect(finding.tags).toContain("tag1");
    expect(finding.tags).toContain("tag2");
});


test("Get non existing finding", async () => {
    try {
        const finding = await FindingCommunicator.get("non_existant_test");
    } catch (err) {
        expect(err).toBeInstanceOf(FindingNotFoundError);
    }
});


test("Upload and delete finding", async () => {
    const uploadFinding = new Finding("12345", new Location(1, 2), ["1", "2"], "image_hash");
    await FindingCommunicator.upload(uploadFinding);
    const newFinding = await FindingCommunicator.get("12345");

    expect(newFinding.id).toBe(uploadFinding.id);
    expect(newFinding.location.longitude).toBe(uploadFinding.location.longitude);
    expect(newFinding.location.latitude).toBe(uploadFinding.location.latitude);
    expect(newFinding.tags).toContain("1");
    expect(newFinding.tags).toContain("2");
    expect(newFinding.image_hash).toBe(uploadFinding.image_hash);

    await FindingCommunicator.delete(uploadFinding.id);

    try {
        const finding = await FindingCommunicator.get(uploadFinding.id);
    } catch (err) {
        expect(err).toBeInstanceOf(FindingNotFoundError);
    }
});