import Finding from '../../src/finding';
import Location from '../../src/location';
import { BadFindingJsonError } from '../../src/errors/finding_errors';


test("Create Finding", () => {
    const finding = new Finding("1234567", new Location(1, 1.1), ["a", "b"], "image_hash");

    expect(finding.id).toBe("1234567");
    expect(finding.location.longitude).toBe(1);
    expect(finding.location.latitude).toBe(1.1);
    expect(finding.tags[0]).toBe("a");
    expect(finding.tags[1]).toBe("b");
    expect(finding.image_hash).toBe("image_hash");
});

test("Build Finding from json successfully", () => {
    const findingJson = {
        id: "123",
        longitude: 1,
        latitude: 1.1,
        tags: ["1", "2"],
        image_hash: "hash"
    };
    const finding = Finding.fromJson(findingJson);

    expect(finding.id).toBe("123");
    expect(finding.location.longitude).toBe(1);
    expect(finding.location.latitude).toBe(1.1);
    expect(finding.tags[0]).toBe("1");
    expect(finding.tags[1]).toBe("2");
    expect(finding.image_hash).toBe("hash");
});


test("Buiding Finding from incomplete json, throws error", () => {
    const findingJson = {
        id: "1234",
        image_hash: "1234"
    };
    try {
        const finding = Finding.fromJson(findingJson);
    } catch (err) {
        expect(err).toBeInstanceOf(BadFindingJsonError);
    }
    
});

test("Creating Json of finding", () => {
    const finding = new Finding("1234567", new Location(1, 1.1), ["a", "b"], "image_hash");
    const findingJson = finding.toJson();

    expect(findingJson.id).toBe(finding.id);
    expect(findingJson.longitude).toBe(finding.location.longitude);
    expect(findingJson.latitude).toBe(finding.location.latitude);
    expect(findingJson.tags).toBe(finding.tags);
    expect(findingJson.image_hash).toBe(finding.image_hash);
});

