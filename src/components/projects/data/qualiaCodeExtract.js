export const door = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Door : MonoBehaviour
{
    #region Properties

    [SerializeField] private GameObject _door;
    [SerializeField] private Transform _wpClosed;
    [SerializeField] private Transform _wpOpen;

    private AudioSource _audio;
    private bool _isMoving = false;
    private bool _isOpen = false;
    private float _speed = 0.1f;

    #endregion Properties

    #region Private methods

    void Start()
    {
        _audio = GetComponent<AudioSource>();
        _door.transform.position = new Vector3(_door.transform.position.x, _wpClosed.position.y, _door.transform.position.z);
    }

    IEnumerator MoveDoor()
    {
        _audio.Play();

        float positionY = _isOpen ? _wpClosed.position.y : _wpOpen.position.y;

        while (_door.transform.position.y != positionY && _isMoving)
        {
            Vector3 target = new Vector3(_door.transform.position.x, positionY, _door.transform.position.z);
            _door.transform.position = Vector3.MoveTowards(_door.transform.position, target, _speed);
            yield return null;
        }

        _isOpen = !_isOpen;
        _isMoving = false;
        StartCoroutine(AudioFadeOut.FadeOut(_audio, 0.1f));
    }

    #endregion Private methods

    #region Public methods

    public void OpenDoor(bool open)
    {
        _isOpen = !open;
        _isMoving = true;
        StartCoroutine(MoveDoor());
    }

    #endregion Public methods

}`;

export const elevator = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Elevator : MonoBehaviour
{
    #region Properties

    [SerializeField] private float _elevatorSpeed = 2.0f;
    [SerializeField] private Switch _switch;
    [SerializeField] private Transform _wpDown;
    [SerializeField] private Transform _wpUp;

    private AudioSource _audio;
    private bool _isMoving = false;
    private bool _isUp = true;

    #endregion Properties

    #region Private methods

    private void Start()
    {
        _audio = GetComponent<AudioSource>();
        transform.position = new Vector3(transform.position.x, _isUp ? _wpUp.position.y : _wpDown.position.y, transform.position.z);
    }

    IEnumerator MoveLift()
    {
        
        float targetY = _isUp ? _wpDown.position.y : _wpUp.position.y;

        _audio.Play();

        while (_isMoving)
        {
            transform.position = Vector3.MoveTowards(transform.position, new Vector3(transform.position.x, targetY, transform.position.z), _elevatorSpeed * Time.deltaTime);

            if (transform.position.y == targetY)
            {
                _isMoving = false;
                _isUp = !_isUp;
                _switch.CanPress = true;
            }

            yield return null;
        }

        _audio.Stop();
    }

    #endregion Private methods

    #region Public methods

    public void RequestLift()
    {
        if (!_isMoving)
        {
            _isMoving = true;
            StartCoroutine(MoveLift());
        }
    }

    #endregion Public methods
}
`;

export const zone = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

[System.Serializable]
public class ColorEvent : UnityEvent<Color> { }

public class Zone : MonoBehaviour
{
    [SerializeField] protected Transform _endPoint;
    public enum Type { Trigger, Danger, ToActivate }
    public ColorEvent ColourEvent;

    protected Color _colour;

    public Color Colour
    {
        get { return _colour; }
        set {
            _colour = value;
            ChangeColour();
        }
    }

    protected virtual void ChangeColour(){}

    public Transform EndPoint
    {
        get { return _endPoint; }
    }

    public virtual Type GetZoneType()
    {
        throw new System.Exception();
    }
}
`;